let memoizeOpenedItems = []
const toggleEditForm = id => {
    let textarea = document.getElementById(id);
    if (textarea.style.display === "none") {
      if (memoizeOpenedItems.length === 0) {
        memoizeOpenedItems.push(textarea);
        textarea.style.display = "block";
      } else {
        memoizeOpenedItems.forEach(opened => {
          opened.style.display = "none";
          memoizeOpenedItems.shift();
        });
        textarea.style.display = "block";
        memoizeOpenedItems.push(textarea);
      }
    } else {
      textarea.style.display = "none";
    }
}