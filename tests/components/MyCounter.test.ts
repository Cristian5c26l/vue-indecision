import { describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MyCounter from '@/components/MyCounter.vue';

describe('<MyCounter />', () => {
  test('should match snapshot', () => {
    const wrapper = mount(MyCounter, {
      props: {
        value: 50,
      },
    });

    // console.log(wrapper.html());

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should renders the counter value correctly and renders the counter square value correctly', () => {
    const value = 50;

    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');

    expect(wrapper.find('h3').text()).toContain(`Counter: ${value}`);
    expect(wrapper.find('[data-testid="square-label"]').text()).toContain(
      `Square: ${value * value}`,
    );

    expect(counterLabel.text()).toContain(`Counter: ${value}`);
    expect(squareLabel.text()).toContain(`Square: ${value * value}`);
  });

  test('should increments the counter when +1 button is clicked', async () => {
    const value = 50;

    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');
    const btnIncrement = wrapper.find('button');

    await btnIncrement.trigger('click');

    expect(counterLabel.text()).toContain(`Counter: ${value + 1}`);
    expect(squareLabel.text()).toContain(`Square: ${(value + 1) * (value + 1)}`);
  });

  test('should decrements the counter when -1 button is clicked', async () => {
    const value = 50;

    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });

    const [counterLabel, squareLabel] = wrapper.findAll('h3');
    const [, btnDecrement] = wrapper.findAll('button');

    await btnDecrement.trigger('click');
    await btnDecrement.trigger('click');

    expect(counterLabel.text()).toContain(`Counter: ${value - 2}`);
    expect(squareLabel.text()).toContain(`Square: ${(value - 2) * (value - 2)}`);
  });
});
