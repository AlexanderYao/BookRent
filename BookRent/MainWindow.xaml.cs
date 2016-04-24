using DevExpress.Xpf.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace BookRent
{
    public partial class MainWindow : DXWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            this.DataContext = new MainVm();
        }

        private void win_Closed(object sender, EventArgs e)
        {
            IniFile ini = IniFile.Instance;
            ini.Write("width", Width.ToString());
            ini.Write("height", Height.ToString());
            ini.Write("top", Top.ToString());
            ini.Write("left", Left.ToString());
        }
    }
}
