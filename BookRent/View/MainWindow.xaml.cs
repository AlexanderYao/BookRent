using DevExpress.Xpf.Core;
using System;

namespace BookRent
{
    public partial class MainWindow : DXWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            this.DataContext = MainVm.Create();
        }

        /// <summary>
        /// 关闭主窗体时，记录下窗体的大小+位置
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void win_Closed(object sender, EventArgs e)
        {
            IniFile ini = IniFile.Instance;
            ini.Write("Width", Width.ToString());
            ini.Write("Height", Height.ToString());
            ini.Write("Top", Top.ToString());
            ini.Write("Left", Left.ToString());
        }
    }
}
