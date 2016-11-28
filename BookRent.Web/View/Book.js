var UIBook = {
    id: "UIBook",
    name: "图书管理",
    rows: [
        { id:"UIBook.ID", view: "text", label: "ID" },
        { id: "UIBook.Name", view: "text", label: "Name" },
        { id: "UIBook.Price", view: "text", label: "Price" },
        {
            margin: 5, cols: [
                { view: "button", value: "下一本", type: "form" },
                { view: "button", value: "取消" }
            ]
        }
    ]
};