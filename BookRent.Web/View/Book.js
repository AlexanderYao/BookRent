var UIBook = {
    id: "UIBook",
    name: "图书管理",
    rows: [
        { view: "text", label: "ID", value: "1" },
        { view: "text", label: "Name", value: "C#入门" },
        { view: "text", label: "Price", value: "30.0" },
        {
            margin: 5, cols: [
                { view: "button", value: "下一本", type: "form" },
                { view: "button", value: "取消" }
            ]
        }
    ]
};