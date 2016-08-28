using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace BookRent
{
    /// <summary>
    /// 序列化、再反序列化，实现深拷贝(Deep Copy)
    /// </summary>
    public static class CopyHelper
    {
        public static T Clone<T>(this T obj)
        {
            using (var ms = new MemoryStream())
            {
                var formatter = new BinaryFormatter();
                formatter.Serialize(ms, obj);
                ms.Position = 0;
                return (T)formatter.Deserialize(ms);
            }
        }
    }
}
