using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookRent
{
    public interface IBootstrapOutput
    {
        void Progress(double value);
        void Output(string text);
    }
}
