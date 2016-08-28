using System.Windows.Controls;

namespace BookRent
{
    public partial class BookManage : UserControl
    {
        public BookManage()
        {
            InitializeComponent();
            this.DataContext = BookManageVm.Create();
        }
    }
}
