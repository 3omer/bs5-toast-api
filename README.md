# bs5-toast-api

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/3omer/bs5-toast-api)

[Github page](https://3omer.github.io/bs5-toast-api/)

```js
// Init the api with BS Toast module
// and a contianer for stacking
toast.init({
  bsToastModule: bootstrap.Toast, 
  container: document.querySelector('.toast-container'), 
});
```

<img src="./images/toast-success.png"></img>

```js
toast.success({ message: 'Request fullfiled' })
```

<img src="./images/toast-error.png"></img>
```js
toast.error({ message: 'Something went wrong!' })
```

<img src="./images/toast-primary.png"></img>
```js
toast.show({ message: 'Bootsrap primary!', duration: 2000 })
```

<img src="./images/toast-icon-font.png"></img>
```js
toast.success({
  message: 'Excatly',
  iconCSS: 'ph-duotone ph-star-four' })
```


<img src="./images/toast-bs-classes.png"></img>
```js
toast.show({ 
  message: 'I am bg-white text-dark fw-bold 🙌', 
  theme: 'text-dark bg-white fw-bold',
  iconCSS: 'bi bi-bootstrap-fill text-primary',
  duration: 2000
})
```


<img src="./images/toast-custom.png"></img>
```js
toast.show({
  message: 'Finally! 🤩 BS 5 Toast API that I can use directly!',
  autohide: false,
  theme: 'toast-custom fw-semibold',
  iconCSS: 'ph-duotone ph-rocket-launch'
});
```



