import "../styles/_base.scss";
import "../styles/components.scss";

import UIButton from "../components/UiButton";

export default {
  title: "Example/UIButton",
  component: UIButton,
  argTypes: {
    text: {
      description: `Текст который будет написан на кнопке`,
      defaultValue: "UIButton"
    },
    type: {
      description: `Тип кнопки, определяет какая иконка будет отображаться`,
      defaultValue: "Plus",
      control: {
        type: "select",
        options: ["Plus", "NoIcon"]
      }
    },
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

export const NoIcon = Template.bind({});
NoIcon.args = {
  text: "I have no icon",
  type: "NoIcon"
};

export const Plus = Template.bind({});
Plus.args = {
  text: "Hello button!"
};
