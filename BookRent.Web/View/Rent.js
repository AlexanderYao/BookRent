var UIRent = {
    id: "UIRent",
    rows: [
        { view: "text", label: "ID", value: "1" },
        { view: "radio", label: "类型", value: "借出", options:["借出", "归还"] },
        { view: "text", label: "书名", value: "C#入门" },
        {
            margin: 5, cols: [
                { view: "button", value: "继续", type: "form" },
                { view: "button", value: "取消" }
            ]
        }
    ]
};