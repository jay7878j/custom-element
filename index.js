const deliveryData = {
  deliveryLocations: [
    {
      pincode: "110001",
      estimatedDeliveryDays: 2,
      locationName: "Connaught Place, Delhi",
    },
    {
      pincode: "400001",
      estimatedDeliveryDays: 3,
      locationName: "Fort, Mumbai",
    },
    {
      pincode: "700001",
      estimatedDeliveryDays: 4,
      locationName: "Dalhousie Square, Kolkata",
    },
    {
      pincode: "600001",
      estimatedDeliveryDays: 3,
      locationName: "Parrys Corner, Chennai",
    },
    {
      pincode: "500001",
      estimatedDeliveryDays: 2,
      locationName: "Afzal Gunj, Hyderabad",
    },
    {
      pincode: "110020",
      estimatedDeliveryDays: 5,
      locationName: "Hauz Khas, Delhi",
    },
    {
      pincode: "400020",
      estimatedDeliveryDays: 4,
      locationName: "Worli, Mumbai",
    },
    {
      pincode: "700020",
      estimatedDeliveryDays: 3,
      locationName: "Salt Lake City, Kolkata",
    },
    {
      pincode: "600020",
      estimatedDeliveryDays: 2,
      locationName: "Anna Nagar, Chennai",
    },
    {
      pincode: "500020",
      estimatedDeliveryDays: 4,
      locationName: "Banjara Hills, Hyderabad",
    },
  ],
};


class DeliveryCheck extends HTMLElement {
  constructor() {
    super();

    this.inputElement = this.querySelector("#inputEl");
    // console.log(this.inputElement);
    this.checkButton = this.querySelector("#checkButton");
    this.deliveryStatusElement = this.querySelector("#deliveryStatus");
    this.inputElement.addEventListener(
      "click",
      this.clearInputField.bind(this)
    );
    this.inputElement.addEventListener("keypress", (event) => {
      if ( event.keyCode < 48 || event.keyCode > 57 || event.target.value.length === 6) {
        event.preventDefault();
      }
    });

    this.checkButton.addEventListener("click", this.pincodeCheck.bind(this));
  }

  clearInputField() {
    this.inputElement.value = "";
    this.deliveryStatusElement.textContent = "";
  }

  pincodeCheck() {
    if (this.inputElement.value.length === 6) {
      let value = this.inputElement.value;
      let objectValue = deliveryData.deliveryLocations.find(
        (eachObject) => eachObject.pincode === value
      );
      // console.log(objectValue);
      if (objectValue !== undefined) {
        let currentDate = new Date();
        let date = currentDate.getDate();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let deliveryDate = date + objectValue.estimatedDeliveryDays;
        // console.log(deliveryDate);
        let estimatedDelivery = new Date(year, month, deliveryDate + 1);
        let deliveryDateString = estimatedDelivery.toString().split(" ");
        this.deliveryStatusElement.innerHTML = `<p>Delivery Date</p>${deliveryDateString[0]}, ${deliveryDateString[2]} ${deliveryDateString[1]}`;
        // console.log(deliveryDateString);
      } else {
        this.deliveryStatusElement.textContent = "Area not Serviceable";
      }
    } else {
      this.deliveryStatusElement.textContent = "Please provide valid area pincode";
    }
  }
}

customElements.define("delivery-check", DeliveryCheck);
