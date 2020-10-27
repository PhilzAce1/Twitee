export function arraySort(arr, id, newComment) {
  const post = arr.find((data) => data.id === id);
  post.comments.unshift(newComment);

  return arr;
}

function sort(arrr) {
  const newArr = [...arrr];
  newArr.sort((a, b) => {
    const first = new Date(a.createdAt).getTime();
    const second = new Date(b.createdAt).getTime();
    return second - first;
  });
  return newArr;
}
export function arrangeComment(arr, i) {
  const newArr = [];
  arr.forEach((x) => {
    const data = {
      author: x.creator.name,
      datatime: x.createdAt,
      content: x.text,
    };
    newArr.unshift(data);
  });

  return sort(newArr);
}

export function deletePost(arr, i) {
  const newArr = arr.filter((x) => x.id !== i);
  return newArr;
}
