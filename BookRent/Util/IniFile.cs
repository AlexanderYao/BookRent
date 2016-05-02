using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;

namespace BookRent
{
    class IniFile
    {
        private IniFile()
        {
            _path = new FileInfo(EXE + ".ini").FullName.ToString();
        }

        private static IniFile _instance;
        public static IniFile Instance
        {
            get
            {
                if (null == _instance)
                {
                    _instance = new IniFile();
                }

                return _instance;
            }
        }

        private string _path;
        public string Path
        {
            get { return _path; }
            set
            {
                _path = new FileInfo(value ?? EXE + ".ini").FullName.ToString();
            }
        }
        string EXE = Assembly.GetExecutingAssembly().GetName().Name;

        [DllImport("kernel32")]
        static extern long WritePrivateProfileString(string Section, string Key, string Value, string FilePath);

        [DllImport("kernel32")]
        static extern int GetPrivateProfileString(string Section, string Key, string Default, StringBuilder RetVal, int Size, string FilePath);

        //public IniFile(string IniPath = null)
        //{
        //    Path = new FileInfo(IniPath ?? EXE + ".ini").FullName.ToString();
        //}

        public string Read(string Key, string Section = null)
        {
            var RetVal = new StringBuilder(255);
            GetPrivateProfileString(Section ?? EXE, Key, "", RetVal, 255, Path);
            return RetVal.ToString();
        }

        public void Write(string Key, string Value, string Section = null)
        {
            WritePrivateProfileString(Section ?? EXE, Key, Value, Path);
        }

        public void DeleteKey(string Key, string Section = null)
        {
            Write(Key, null, Section ?? EXE);
        }

        public void DeleteSection(string Section = null)
        {
            Write(null, null, Section ?? EXE);
        }

        public bool KeyExists(string Key, string Section = null)
        {
            return Read(Key, Section).Length > 0;
        }
    }
}
