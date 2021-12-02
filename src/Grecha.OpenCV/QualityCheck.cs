using OpenCvSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grecha.OpenCV
{
    public class QualityCheck
    {
        private static Size size = new Size(450, 330);

        public static int Execute(byte[] data)
        {
            Mat source = Mat.FromImageData(data);
            // кропнем центр картинки
            Rect rectCrop = new Rect(1200, 1000, 2000, 1200);
            source = source.SubMat(rectCrop).Clone();

            SaveImage(source, "source");
            // поблюрим чтобы точней детектить края объектов
            Mat blurred = new Mat();
            Cv2.MedianBlur(source, blurred, 11);
            
            // берём канал насыщения чтобы отрезать коробок
            Mat hsv = new Mat();
            Cv2.CvtColor(blurred, hsv, ColorConversionCodes.RGB2HSV);
            Cv2.Split(hsv, out var saturation);
            Mat gray = saturation[2];

            // выделим контуры
            Mat thresh = new();
            Cv2.AdaptiveThreshold(gray, thresh, 256, AdaptiveThresholdTypes.GaussianC, ThresholdTypes.BinaryInv, 19, 1);

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

            // самый большой квадрат - наш коробок
            Cv2.Rectangle(blurred, maxRect.Value, Scalar.Yellow, 2);
            SaveImage(blurred, "rectangles");

            // это наш коробок, ресайзнем к константному размеру (310х430)
            Mat boxColor = source.SubMat(maxRect.Value).Clone();
            Mat boxHsv = hsv.SubMat(maxRect.Value).Clone();
            SaveImage(boxHsv, "hsv");

            // немного уменьшим границы чтобы в анализ не попали стенки коробка
            Mat resized = new Mat();
            Cv2.Resize(boxHsv, resized, size);
            resized = resized.SubMat(20, 300, 20, 420);

            // для точности оценим качество по двум параметрам:
            // 1. чёрный\белый

            // 2. один канал HSV
            // выделение синего цвета
            Mat mask = resized.ExtractChannel(2);    // синий канал
            //SaveImage(mask, cartNumber, "mask");
            Cv2.Threshold(mask, mask, 110, 256, ThresholdTypes.Binary);


            // почистим от мусора
            var ones = Mat.Ones(3, 3, (MatType)MatType.CV_8U).ToMat();

            Mat eroded = new Mat();
            Mat dilated = new Mat();
            Cv2.Erode(mask, eroded, ones, iterations: 2);
            Cv2.Dilate(eroded, dilated, ones, iterations: 2);
            SaveImage(eroded, "result");

            int total = size.Width * size.Height;
            int nonZero = Cv2.CountNonZero(dilated);

            // количество чёрных пикселей
            return total - nonZero;
        }

        private static void SaveImage(Mat mat, string name) =>
            mat.SaveImage($"C:\\temp\\grecha\\quality-{name}.jpg");
    }
}
