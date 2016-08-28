
namespace BookRent
{
    public interface IBootstrapOutput
    {
        void Progress(double value);
        void Output(string text);
    }
}
