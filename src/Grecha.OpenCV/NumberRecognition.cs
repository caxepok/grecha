using OpenCvSharp;

namespace Grecha.OpenCV
{
    public class NumberRecognition
    {
        public static string Execute(byte[] image)
        {
            string text = String.Empty;
            // повернём картинк
            // читает картинку
            Mat source = Mat.FromImageData(image);
            Cv2.Rotate(source, source, RotateFlags.Rotate90Clockwise);
            // переводом в ч\б
            Mat gray = new Mat();
            Cv2.CvtColor(source, gray, ColorConversionCodes.BGR2GRAY);

            Mat tresh = new Mat();
            Cv2.Threshold(gray, tresh, 128, 255, ThresholdTypes.Binary | ThresholdTypes.Otsu);
            SaveImage(tresh, $"tresh");

            Mat kernel = Cv2.GetStructuringElement(MorphShapes.Rect, new Size(14, 14));
            Mat dilation = new Mat();
            Cv2.Dilate(tresh, dilation, kernel, iterations: 1);
            dilation = ~dilation;

            Cv2.FindContours(dilation, out var contours, out var hier, RetrievalModes.External, ContourApproximationModes.ApproxNone);

            Mat rects = source.Clone();
            int i = 0;
            foreach (var contour in contours)
            {
                var rect = Cv2.BoundingRect(contour);
                // мелкие области - не текст, отфильтруем
                if (rect.Width < 50 || rect.Height < 50)
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
                    SaveImage(crop, $"crop");
                    Cv2.PutText(rects, text, rect.Location, HersheyFonts.HersheyComplex, 2, Scalar.Red);
                }
                Cv2.Rectangle(rects, rect, Scalar.Blue);
            }
            SaveImage(rects, "rects");
            return text;
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
            if (text.Length < 8)
                return String.Empty;
            return text;
        }

        private static void SaveImage(Mat mat, string name) =>
            mat.SaveImage($"C:\\temp\\grecha\\ocr-{name}.jpg");
    }
}