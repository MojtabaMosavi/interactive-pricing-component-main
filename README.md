## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)


### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Use the slider and toggle to see prices for different page view numbers

### Screenshot

![](./design/desktop-design.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- BEM 
- Sass 


### What I learned

How to implement a accessible toggle switch and making look consistant across different browser.


```html
      <fieldset class="card__toggle" tabindex="0">
        <legend class="sr-only"> Chose purchase plan</legend>
        <label for="monthlyBiling" class="card__toggle-title card__toggle-title--left"> Monthly Billing</label>

        <span class="card__toggle-wrapper">
          <input class="card__toggle-input card__toggle-input--left" 
                  type="radio" 
                  name="purchase-plan" 
                  id="monthlyBiling" 

                  >

          <input class="card__toggle-input card__toggle-input--right" 
                  type="radio" 
                  name="purchase-plan" 
                  id="yearlyBilling">

          <span class="card__toggle-background"></span>
          <span class="card__toggle-switch"></span>
        </span>

        <label for="yearlyBilling" class="card__toggle-title card__toggle-title--right">
          Yearly Billing 
        </label>
        <span class="card__toggle-discount--mobile card__toggle-discount" >-25%</span>
        <span class="card__toggle-discount--desktop card__toggle-discount">25% discount</span>
      </fieldset>
```



### Useful resources

- [Example resource 1](https://inclusive-components.design/toggle-button/) - This is great primer on how you should go about designing an accessible toggle switch. 

