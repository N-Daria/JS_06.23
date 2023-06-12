function createDebounceFunction(func, num) {
  let funcId = 0;

  if (
    !func ||
    typeof func !== "function" ||
    !num ||
    !Number.isInteger(num) ||
    num < 0
  ) {
    throw new Error("Invalid argument");
  }

  return function delayedFunc() {
    if (funcId) {
      clearTimeout(funcId);
    }

    funcId = setTimeout(() => {
      return func();
    }, num);
  };
}

class RickAndMorty {
  getCharacter(id) {
    if (!id || !Number.isInteger(id) || id < 0) {
      throw new Error("Invalid character id");
    }

    return fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        if (!res.name) {
          return null;
        } else {
          return res;
        }
      })
      .catch((err) => {
        console.log(err.status);
      });
  }

  async getEpisode(id) {
    try {
      if (!id || !Number.isInteger(id) || id < 0) {
        throw new Error();
      }

      const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
      const jsonedRes = await res.json();

      if (!jsonedRes.name) {
        return null;
      } else {
        return jsonedRes;
      }
    } catch {
      throw new Error("Invalid episode id");
    }
  }
}
