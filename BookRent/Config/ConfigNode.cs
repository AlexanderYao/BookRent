using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace BookRent
{
    [XmlRoot("config")]
    public class ConfigNode
    {
        [XmlElement("confirmUpdate")]
        public bool ConfirmUpdate { get; set; }

        [XmlElement("canRentCount")]
        public int CanRentCount { get; set; }

        [XmlArray("plugins")]
        [XmlArrayItem("plugin")]
        public PluginNode[] Plugins { get; set; }
    }
}
