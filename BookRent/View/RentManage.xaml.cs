using System.Windows.Controls;
using System.Windows.Input;

namespace BookRent
{
    public partial class RentManage : UserControl
    {
        public RentManage()
        {
            InitializeComponent();
            this.DataContext = RentManageVm.Create();
        }

        private void ComboBoxEdit_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                bookCbe.Focus();
            }
        }
    }
}
