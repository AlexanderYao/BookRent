var UIRent = {
    id: "UIRent",
    rows: [
        { view: "text", label: "ID" },
        { view: "radio", label: "类型", options:["借出", "归还"] },
        { view: "text", label: "书名" },
        {
            margin: 5, cols: [
                { view: "button", value: "继续", type: "form" },
                { view: "button", value: "取消" }
            ]
        }
    ]
};