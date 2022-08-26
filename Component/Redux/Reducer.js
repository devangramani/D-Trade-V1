const iState = {
  isLogged: 0,
  theme: '#015c8d',
  token: '',
  dark_light: '',
  username_id: '',
  server_code: '',
  username: '',
  mode: 0,
};

const Reducer = (state = iState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogged: action.payload,
      };
    case 'TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'USERNAME_ID':
      return {
        ...state,
        username_id: action.payload,
      };
    case 'SERVER_CODE':
      return {
        ...state,
        server_code: action.payload,
      };
    case 'USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'MODE':
      return {
        ...state,
        mode: action.payload,
      };

    case 'CLEAR_PF':
      return {
        ...state,
        pfdata: [],
        total: 0,
      };
    case 'PF': {
      if (action.total > 0) {
        var newpfdata = state.pfdata;
        if (Array.isArray(newpfdata)) {
          var found = false;
          for (var i = 0; i < newpfdata.length; i++) {
            if (newpfdata[i].script_id == action.script_id) {
              found = i;
              continue;
            }
          }
          if (found === false) {
            newpfdata.push({
              script_id: action.script_id,
              pf: action.pf,
            });
            var total = 0;
            newpfdata.map(i => {
              total = parseFloat(total) + parseFloat(i.pf);
            });
            return {...state, pfdata: newpfdata, total: total};
          } else {
            newpfdata[found].pf = action.pf;
            var total = 0;
            newpfdata.map(i => {
              total = parseFloat(total) + parseFloat(i.pf);
            });
            return {...state, pfdata: newpfdata, total: total};
          }
        } else {
          newpfdata.push({
            script_id: action.script_id,
            pf: action.pf,
          });
          return {...state, pfdata: newpfdata, total: action.pf};
        }
      }
    }
    default:
      return {...state};
  }
};

export default Reducer;
