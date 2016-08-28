using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using DevExpress.Xpf.Core;

namespace BookRent
{
    public partial class SplashScreen : Window, ISplashScreen, IBootstrapOutput
    {
        public SplashScreen()
        {
            Copyright = string.Format("Copyright (c) 2015-{0} AlexanderYao", DateTime.Today.Year);
            InitializeComponent();
            SetState("系统正在启动");
        }

        public string Copyright { get; set; }

        public static void SetProgress(double value)
        {
            DXSplashScreen.Progress(value);
        }

        public static void SetState(string state)
        {
            SplashScreenViewModel.DesignTimeData.State = state;
        }

        void ISplashScreen.Progress(double value)
        {
            progressBar.Value = value;
        }

        void ISplashScreen.CloseSplashScreen()
        {
            this.Close();
        }

        void ISplashScreen.SetProgressState(bool isIndeterminate)
        {
            progressBar.IsIndeterminate = isIndeterminate;
        }

        void IBootstrapOutput.Output(string text)
        {
            SetState(text);
        }

        void IBootstrapOutput.Progress(double value)
        {
            SetProgress(value);
        }
    }
}