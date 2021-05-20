export const myStore = {
  get: function(key:string) {
      let value = localStorage.getItem(key);
      if (value) {
        let value_json = JSON.parse(value);
        return value_json;
      } else {
          return {};
      }
  },
  set: function(key:string, value:any) {
      console.log('进来设置本地', value)
      localStorage.setItem(key, JSON.stringify(value));
  },
  remove: function(key:string) {
      localStorage.removeItem(key);
  },
  clear: function() {
      localStorage.clear();
  }
};