using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace BookRent
{
    public class PluginNode
    {
        [XmlAttribute("name")]
        public string Name { get; set; }

        [XmlAttribute("isOn")]
        public bool IsOn { get; set; }
    }
}
