using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc.Web.Android.Controllers
{
    public class VercodeController : BaseController
    {
        /// <summary>
        /// 随机种子
        /// </summary>
        Random _random = new Random((int)DateTime.Now.Ticks);
        /// <summary>
        /// 随机线条数
        /// </summary>
        const int RANDOM_LINE_COUNT = 10;
        /// <summary>
        /// 随机点数
        /// </summary>
        const int RANDOM_PRINT_COUNT = 80;
        /// <summary>
        /// 字体数组
        /// </summary>
        string[] Fonts = new[] { 
            "Helvetica", "Geneva", "Times New Roman", "Courier New", "Arial" 
        };
        /// <summary>
        /// 生成
        /// </summary>
        public ActionResult Index()
        {
            string exp = string.Empty;
            var code = GetRandomCalc(out exp);
            Session["VALIDATE_CODE"] = code;
            CreateImage(exp);
            return new EmptyResult();
        }

        /// <summary>
        /// 随机获取一个加减表达式
        /// </summary>
        /// <returns></returns>
        public int GetRandomCalc(out string exp)
        {
            int value = 0;
            int n1 = 0;
            int n2 = 0;
            string n3 = _random.Next(0, 10) % 2 == 0 ? "+" : "-";

            if (n3 == "+")
            {
                n1 = _random.Next(0, 30);
                n2 = _random.Next(1, 30);
                value = n1 + n2;
            }
            else
            {
                n2 = _random.Next(0, 30);
                while (n1 <= n2) n1 = _random.Next(1, 60);
                value = n1 - n2;
            }

            exp = string.Format("{0}{1}{2}=?"
                , n1, n3, n2);

            return value;
        }


        /// <summary>
        /// 获取随机颜色
        /// </summary>
        public Color GetRandomColor()
        {
            var red = _random.Next(255);
            var green = _random.Next(255);
            var blue = (red + green > 400) ? 0 : 400 - red - green;
            if (blue > 255) blue = 255;
            return Color.FromArgb(red, green, blue);
        }

        /// <summary>
        /// 创建图片
        /// </summary>
        /// <param name="str"></param>
        public void CreateImage(string validateCode)
        {

            int width = validateCode.Length * 30;
            Random rand = new Random();
            Bitmap bmp = new Bitmap(width + validateCode.Length * 3, 50);

            Graphics g = Graphics.FromImage(bmp);
            g.Clear(Color.FromArgb(255, 255, 255));

            DrawLine(g, bmp, RANDOM_LINE_COUNT);
            DrawPrint(bmp, RANDOM_PRINT_COUNT);

            for (int i = 0; i < validateCode.Length; i++)
            {

                Matrix matrix = new Matrix();
                matrix.Shear((float)_random.Next(0, 300) / 1000 - 0.25f, (float)_random.Next(0, 100) / 1000 - 0.05f);
                g.Transform = matrix;
                string str = validateCode.Substring(i, 1);
                LinearGradientBrush brush = new LinearGradientBrush(new Rectangle(0, 0, bmp.Width, bmp.Height), Color.Blue, Color.DarkRed, 1.2f, true);
                Point pos = new Point(i * 30 + 1 + rand.Next(3), 1 + rand.Next(5));
                Font font = new Font(Fonts[_random.Next(Fonts.Length - 1)], _random.Next(24, 30), FontStyle.Bold);
                g.DrawString(str, font, brush, pos);
            }

            MemoryStream ms = new MemoryStream();
            bmp.Save(ms, ImageFormat.Png);
            Response.ClearContent();
            Response.ContentType = "image/png";
            Response.BinaryWrite(ms.ToArray());
            g.Dispose();
            bmp.Dispose();
            Response.End();
        }

        /// <summary>
        /// 随机画线
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="bmp"></param>
        /// <param name="count"></param>
        private void DrawLine(Graphics graphics, Bitmap bmp, int count)
        {
            var rand = new Random((int)DateTime.Now.Ticks);
            for (var i = 0; i < count; i++)
            {
                var x1 = rand.Next(bmp.Width);
                var y1 = rand.Next(bmp.Height);
                var x2 = rand.Next(bmp.Width);
                var y2 = rand.Next(bmp.Height);
                graphics.DrawLine(new Pen(GetRandomColor()), x1, y1, x2, y2);
            }
        }

        /// <summary>
        /// 随机点
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="bmp"></param>
        /// <param name="count"></param>
        private void DrawPrint(Bitmap bmp, int count)
        {
            for (var i = 0; i < count; i++)
            {
                var x = _random.Next(bmp.Width);
                var y = _random.Next(bmp.Height);
                bmp.SetPixel(x, y, GetRandomColor());
            }
        }
    }
}