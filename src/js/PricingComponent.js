export default class PricingComponent{

    constructor(){
        // dom caching 
        this.app = document.querySelector(".card");
        this.numberOfViews = this.app.querySelector(".card__heading-digit");
        this.price = this.app.querySelector(".card__pricing-digit");
        this.pricingMode = this.app.querySelector(".card__heading-interval");
        this.sliderInput = this.app.querySelector(".card__slider-input");
        this.sliderBar = this.app.querySelector(".card__slider-bar");
        this.sliderBarBg = this.app.querySelector(".card__slider-bar-inner");
        this.toggleBg = this.app.querySelector(".card__toggle-background");

        // toggle 
        this.toggleInputRight = this.app.querySelector(".card__toggle-input--right");
        this.toggleInputLeft = this.app.querySelector(".card__toggle-input--left");
        this.toggleSwitch = this.app.querySelector(".card__toggle-switch");
        this.toggleRightLabel = this.app.querySelector(".card__toggle-title--right");
        this.toggleLeftLabel = this.app.querySelector(".card__toggle-title--left");

        // booleans
        this.yearlyBilling = false;

        //render 
        this.render();
    }   

    // binding events 
    bindEventListner(){

        // slider related events 
        this.sliderInput.addEventListener("change",(event)=> {
            this.updateSlider(event);
            console.log(event)
        });

        // toggle functionality 

        this.toggleInputLeft.addEventListener("click", () => { 
            this.toggleLeft();
            this.updatePrice(this.fliterPriceInput());
        })

        this.toggleInputRight.addEventListener("click", () => { 
            this.toggleRight();
            this.updatePrice(this.fliterPriceInput());
        })
    }

    // render 
    render(){
        this.bindEventListner();
    }  

    // updating the slider  
    updateSlider(event){
        let value = this.sliderInput.value
        this.sliderInput.setAttribute("value",value)

        this.updateRangeBg();
        this.updatePrice(this.fliterPriceInput());
        this.updatePageView(this.adjustNumberOfviews(this.fliterPriceInput()));
    }
    
    // toggling 

    toggleLeft(){
        this.yearlyBilling = false
        this.toggleSwitch.classList.remove("card__toggle-switch--active");
        this.toggleLeftLabel.classList.add("underline");
        this.toggleRightLabel.classList.remove("underline");
        this.toggleBg.classList.remove("card__toggle-background--active");
    }

    toggleRight(){
        this.yearlyBilling = true;
        this.toggleSwitch.classList.add("card__toggle-switch--active");
        this.toggleRightLabel.classList.add("underline");
        this.toggleLeftLabel.classList.remove("underline");
        this.toggleBg.classList.add("card__toggle-background--active");

    }

    // update range backgorund 
    updateRangeBg(){
        this.sliderBarBg.style.width = `${((this.sliderInput.value - 8) / (36-8)) * 100}%`;
    }

    // adjusting the number of views 
    adjustNumberOfviews(value){
        switch(parseInt(value)){
            case 8:
                return 10
            case 12:
                return 50
            case 16:
                return 100
            case 20:
                return 500
            case 24:
                return 500
            case 28:
                return 1000
            case 32:
                return 1000;
            case 36:
                return 1000
            default:
                throw Error(`No mach was found for the value ${value}`);
        }
    
    }    

    // filter the values of the range input to match the custom format
    fliterPriceInput(){
        const rangeValue = parseInt((((this.sliderInput.value - 8) / (36-8)) * 100));
        if( 0 < rangeValue && rangeValue < 10){
            return 8

        }else if( 10 <= rangeValue && rangeValue <= 20){
            return 12 

        }else if( 20 <= rangeValue && rangeValue <= 30){
            return 16

        }else if(30 <= rangeValue && rangeValue<= 60){
            return 24

        }else if( 60 <= rangeValue && rangeValue <= 100){
            return 36

        }else{
            throw Error(`value ${rangeValue} is not supported.`)
        }
    }

    // set pageview
    updatePageView(value=0){
        let prefix;
        (value >= 1000 ) ?( prefix = "M",value /= 1000) : prefix = 'K'
        value ? this.numberOfViews.textContent=`${value + prefix}` :"";
    }

    // set price
    updatePrice(value=0){
        this.yearlyBilling ? value *= 0.75 : "";
        value ? this.price.textContent= `$${value}.00` : "";
    }

}