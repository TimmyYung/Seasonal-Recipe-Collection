function getCurrentSeason() {
    const month = new Date().getMonth();
    
    if (month >= 2 && month <= 4) {
      return 'Spring';
    } else if (month >= 5 && month <= 7) {
      return 'Summer';
    } else if (month >= 8 && month <= 10) {
      return 'Autumn';
    } else {
      return 'Winter';
    }
  }
  
  export default getCurrentSeason;
  