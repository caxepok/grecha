using OpenCvSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grecha.OpenCV
{
    /// <summary>
    /// Класс с методом оценки качества сырья
    /// </summary>
    public class QualityCheck
    {
        // размер до которого ресазйится найденный вагон с сырём при оценке качества
        private static Size size = new Size(450, 330);

        /// <summary>
        /// Оценивает качество сырья по соотношению площадей чёрных и белых зон на изображении
        /// </summary>
        /// <param name="data">изображение</param>
        /// <returns>качественная оценка сырья</returns>
        public static (int, byte[]) Execute(byte[] data)
        {
            Mat source = Mat.FromImageData(data);
            // кропнем центр картинки - там "вагон"
            Rect rectCrop = new Rect(1200, 1000, 2000, 1200);
            source = source.SubMat(rectCrop).Clone();
            SaveImage(source, "source");

            // поблюрим чтобы точней детектить края объектов
            Mat blurred = new Mat();
            Cv2.MedianBlur(source, blurred, 11);
            
            // берём канал насыщения чтобы отрезать "вагон"
            Mat hsv = new Mat();
            Cv2.CvtColor(blurred, hsv, ColorConversionCodes.RGB2HSV);
            Cv2.Split(hsv, out var saturation);
            Mat gray = saturation[2];
            // выделим контуры
            Mat thresh = new();
            Cv2.AdaptiveThreshold(gray, thresh, 256, AdaptiveThresholdTypes.GaussianC, ThresholdTypes.BinaryInv, 51, 1);

            // самый большой прямоугольник - наш "вагон"
            var contours = Cv2.FindContoursAsArray(thresh, RetrievalModes.List, ContourApproximationModes.ApproxSimple);
            int maxRectSquare = 0;
            Rect? maxRect = null;
            foreach (var contour in contours)
            {
                var rect = Cv2.BoundingRect(contour);

                if (maxRect == null)
                    maxRect = rect;
                if (rect.Height * rect.Width > maxRectSquare)
                {
                    maxRectSquare = rect.Height * rect.Width;
                    maxRect = rect;
                }
                Cv2.Rectangle(blurred, rect, Scalar.White, 1);
            }
            
            // сохраним превьюшку чтобы понимать что происходит
            Cv2.Rectangle(blurred, maxRect.Value, Scalar.Yellow, 2);
            SaveImage(blurred, "rectangles");

            // это наш коробок, ресайзнем к константному размеру (450x330)
            Mat boxColor = source.SubMat(maxRect.Value).Clone();
            Mat boxHsv = hsv.SubMat(maxRect.Value).Clone();
            Mat boxGray = gray.SubMat(maxRect.Value).Clone();
            SaveImage(boxHsv, "hsv");
            SaveImage(boxColor, "color");

            // немного уменьшим границы чтобы в анализ не попали стенки "вагона"
            Mat resized = new Mat();
            Cv2.Resize(boxHsv, resized, size);
            resized = resized.SubMat(20, size.Height - 20, 20, size.Width - 20);

            // выделяем синий канал
            Mat mask = resized.ExtractChannel(2);    // синий канал
            Cv2.Threshold(mask, mask, 100, 256, ThresholdTypes.Binary);
            SaveImage(mask, "gray");

            // почистим от небольших мусорных областей
            var ones = Mat.Ones(3, 3, (MatType)MatType.CV_8U).ToMat();
            Mat eroded = new Mat();
            Mat dilated = new Mat();
            Cv2.Erode(mask, eroded, ones, iterations: 2);
            Cv2.Dilate(eroded, dilated, ones, iterations: 2);
            SaveImage(dilated, "result");

            // считаем количество белых\чёрных пикселей
            int total = dilated.Rows * dilated.Cols;
            int nonZero = Cv2.CountNonZero(dilated);

            int black = total - nonZero;
            byte[] imageData = boxGray.ToBytes(".jpg");

            // вся картинка белая :) наверняка это ошибка, но считаем что сырьё 100% чистоты и не делим на ноль, не схлопываем вселенную
            if (black == 0)
                return (100, imageData);

            // чистота сырья - отношение белых пикселей к чёрным
            int quality = 100 - (int)((float)black / total * 100);
            return (quality, imageData);
        }

        /// <summary>
        /// Сохраняет превьюшку на диск
        /// </summary>
        private static void SaveImage(Mat mat, string name) =>
            mat.SaveImage($"c:\\temp\\grecha\\quality-{name}.jpg");
    }
}
