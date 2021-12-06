using OpenCvSharp;

namespace Grecha.OpenCV
{
    /// <summary>
    /// Класс для распознавания номеров на вагонах
    /// OpenCV + tesseract
    /// </summary>
    public class NumberRecognition
    {
        /// <summary>
        /// Ищет восьмизначный номер вагона на изображении
        /// </summary>
        /// <param name="image">изображение</param>
        /// <returns>номер вагона</returns>
        public static (string, byte[]) Execute(byte[] image)
        {
            // читает картинку
            Mat source = Mat.FromImageData(image);
            // повернём картинку (т.к. со второго телефона она приходит почему-то перевёрнутой)
            Cv2.Rotate(source, source, RotateFlags.Rotate90Clockwise);
            // переводом в ч\б
            Mat gray = new Mat();
            Cv2.CvtColor(source, gray, ColorConversionCodes.BGR2GRAY);
            SaveImage(gray, "gray");

            // бинаризуем
            Mat canny = new Mat();
            Cv2.Canny(gray, canny, 48, 256);

            Mat kernel = Cv2.GetStructuringElement(MorphShapes.Rect, new Size(16, 16));
            Mat dilation = new Mat();
            Cv2.Dilate(canny, dilation, kernel, iterations: 2);
            SaveImage(dilation, "dilation");

            // ищем контуры
            Cv2.FindContours(dilation, out var contours, out var hier, RetrievalModes.External, ContourApproximationModes.ApproxNone);

            // среди контуров ищем прямугольник с тектом
            Mat rects = source.Clone();
            int i = 0;
            string text = String.Empty;
            byte[]? outImage = null;
            foreach (var contour in contours)
            {
                var rect = Cv2.BoundingRect(contour);
                // мелкие области - не текст, отфильтруем
                if (rect.Width < 30 || rect.Height < 30)
                    continue;
                i++;
                var crop = gray.SubMat(rect);
                Cv2.Threshold(crop, crop, 128, 255, ThresholdTypes.Binary | ThresholdTypes.Otsu);
                // ищем текст
                var tesseract = OpenCvSharp.Text.OCRTesseract.Create(language: "eng", charWhitelist: "0123456789", psmode: 10);
                tesseract.Run(crop, out text, out _, out _, out var confidences, OpenCvSharp.Text.ComponentLevels.Word);
                text = ExtractCartNumber(text);

                if (text != String.Empty)
                {
                    // сохраним превьюшку чтобы понимать что происходит
                    SaveImage(crop, $"crop");
                    Cv2.Rectangle(rects, rect, Scalar.Blue);
                    Cv2.PutText(rects, text, rect.Location, HersheyFonts.HersheyComplex, 2, Scalar.Red);
                    SaveImage(rects, "rects");
                    outImage = crop.ToBytes(".jpg");
                    break;
                }
            }
            return (text, outImage);
        }

        /// <summary>
        /// Берём только номера вагонов - 8 чисел чтобы не захватывать соседние вагоны
        /// </summary>
        /// <param name="text">распознанный текст</param>
        /// <returns>номер вагона, или пустой текст если номера нет</returns>
        private static string ExtractCartNumber(string text)
        {
            if (String.IsNullOrEmpty(text))
                return String.Empty;
            text = String.Concat(text.Where(_ => Char.IsDigit(_)));
            if (text.Length != 8)
                return String.Empty;
            return text;
        }

        /// <summary>
        /// Сохраняет превьюшку на диск
        /// </summary>
        private static void SaveImage(Mat mat, string name) =>
            mat.SaveImage($"c:\\temp\\grecha\\ocr-{name}.jpg");
    }
}