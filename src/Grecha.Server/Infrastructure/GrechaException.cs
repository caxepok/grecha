using System;

namespace grechaserver.Infrastructure
{
    public class GrechaException : Exception
    {
        public GrechaException(string message) : base(message)
        {
        }
    }
}
