var UIPerson = {
    id: "UIPerson",
    rows: [
        { view: "text", label: "ID", value: "1" },
        { view: "text", label: "姓名", value: "wwy" },
        { view: "text", label: "入会时间", value: "2016-11-28" },
        {
            margin: 5, cols: [
                { view: "button", value: "继续录入", type: "form" },
                { view: "button", value: "取消" }
            ]
        }
    ]
};