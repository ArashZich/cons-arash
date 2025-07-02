function projectHasImage(category: string): boolean {
  switch (category) {
    case 'furniture':
    case 'home_appliances':
    case 'wall_mounted':
      return false;

    case 'carpet':
    case 'stone_ceramic_flooring':
    case 'stone_ceramic_wall_covering':
    case 'frame':
    case 'curtain':
    case 'wallpaper':
    case 'necklace':
    case 'earrings':
    case 'bow_tie':
    case 'regal':
      return true;

    default:
      return false;
  }
}

function projectHasDimensions(category: string): boolean {
  switch (category) {
    case 'furniture':
    case 'home_appliances':
    case 'wall_mounted':
      return false;

    case 'carpet':
    case 'stone_ceramic_flooring':
    case 'stone_ceramic_wall_covering':
    case 'frame':
    case 'curtain':
    case 'wallpaper':
      return true;

    default:
      return false;
  }
}

export { projectHasImage, projectHasDimensions };
