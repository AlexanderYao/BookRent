var UIPerson = {
    id: "UIPerson",
    rows: [
        { view: "text", label: "ID" },
        { view: "text", label: "姓名" },
        { view: "text", label: "入会时间" },
        {
            margin: 5, cols: [
                { view: "button", value: "继续录入", type: "form" },
                { view: "button", value: "取消" }
            ]
        }
    ]
};