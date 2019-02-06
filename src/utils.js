export const firebaseLooper = snapshot => {
  let data = [];

  snapshot.forEach(el => {
    data.push({
      ...el.val(),
      id: el.key,
    });
  });

  return data;
}