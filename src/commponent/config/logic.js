export const isPresentInFavorite = (favorites, reataurant) => {
  for (let item of favorites) {
    if (reataurant.id === item.id) {
      return true;
    }
  }
  return false;
};
