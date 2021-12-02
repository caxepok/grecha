using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace grechaserver.Infrastructure
{
    public class BinaryInputFormatter : InputFormatter
    {
        const string binaryContentType = "application/octet-stream";
        const int bufferLength = 16384;

        public BinaryInputFormatter()
        {
            SupportedMediaTypes.Add(new Microsoft.Net.Http.Headers.MediaTypeHeaderValue(binaryContentType));
        }

        public async override Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context)
        {
            using var ms = new MemoryStream(bufferLength);
            await context.HttpContext.Request.Body.CopyToAsync(ms);
            object result = ms.ToArray();
            return await InputFormatterResult.SuccessAsync(result);
        }

        protected override bool CanReadType(Type type) => type == typeof(byte[]);
    }
}
