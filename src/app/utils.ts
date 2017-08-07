
  export const usingFetchDirectly = (files, uploadFile) => {
    var form = new FormData();
    //form.append("image", _args.target.files[0]);
    form.append("query", uploadFile.loc.source.body);
    form.append("operationName", 'uploadFile');
    form.append("variables", JSON.stringify({
      originalname: "test"
    }));

    Object.keys(files).forEach((filename) => {
      console.log(files[filename])
      let { name } = files[filename]
      form.append('filename', files[filename])
    })

    fetch("https://aks-graphql-sample1.glitch.me/graphql", {
      method: "POST",
      body: form,
      credentials: 'same-origin',
    }).then((data) => data.json())
      .then(d => console.log(d))
  }