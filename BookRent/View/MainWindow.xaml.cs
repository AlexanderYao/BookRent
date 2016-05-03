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
            this.DataContext = MainVm.Create();
        }

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
