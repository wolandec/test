import "../styles/_base.scss";
import "../styles/components.scss";

import UIButton from "../components/UiButton";

export default {
  title: "Example/UIButton",
  component: UIButton,
  argTypes: {
    msg: "Hello!",
    type: "Plus",
    onClick: {
      action: "clicked"
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UiButton: UIButton },
  template: '<ui-button @clicked="onClick" v-bind="$props"/>'
});

export const Primary = Template.bind({});
Primary.args = {
  msg: "Hello button!"
};
