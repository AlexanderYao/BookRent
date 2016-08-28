using System.Windows.Controls;

namespace BookRent
{
    public partial class PersonManage : UserControl
    {
        public PersonManage()
        {
            InitializeComponent();
            this.DataContext = PersonManageVm.Create();
        }
    }
}
