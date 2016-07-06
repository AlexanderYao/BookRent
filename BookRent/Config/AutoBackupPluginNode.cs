using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace BookRent
{
    public class AutoBackupPluginNode : PluginNode
    {
        [XmlElement("defaultDbPath")]
        public string DefaultDbPath { get; set; }

        [XmlElement("backupDir")]
        public string BackupDir { get; set; }

        [XmlElement("backupTime")]
        public TimeSpan BackupTime { get; set; }
    }
}
