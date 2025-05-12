import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'COMPONENTS/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 색상, 크기 및 스타일 변형을 제공하는 기본 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text', 'ghost'],
      description: '버튼 스타일 변형',
      defaultValue: 'solid',
    },
    color: {
      control: 'select',
      options: ['black', 'white', 'primary', 'secondary'],
      description: '버튼 색상',
      defaultValue: 'black',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼을 부모 요소의 전체 너비로 확장',
    },
    width: {
      control: 'text',
      description: '버튼의 너비 (픽셀 또는 CSS 값)',
    },
    height: {
      control: 'text',
      description: '버튼의 높이 (픽셀 또는 CSS 값)',
    },
    onClick: { action: 'clicked' },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    children: 'Solid 버튼',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    children: 'Outline 버튼',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Text 버튼',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    color: 'primary',
    children: 'Ghost 버튼',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화 버튼',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼',
  },
};

export const CustomSize: Story = {
  args: {
    width: 200,
    height: 48,
    children: '커스텀 크기 버튼',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <div>
        <h3 className='mb-2 font-semibold'>Solid Variant</h3>
        <div className='flex gap-4'>
          <Button variant='solid' color='black'>
            Black
          </Button>
          <Button variant='solid' color='white'>
            White
          </Button>
          <Button variant='solid' color='primary'>
            Primary
          </Button>
          <Button variant='solid' color='secondary'>
            Secondary
          </Button>
        </div>
      </div>

      <div>
        <h3 className='mb-2 font-semibold'>Outline Variant</h3>
        <div className='flex gap-4'>
          <Button variant='outline' color='black'>
            Black
          </Button>
          <Button variant='outline' color='white'>
            White
          </Button>
          <Button variant='outline' color='primary'>
            Primary
          </Button>
          <Button variant='outline' color='secondary'>
            Secondary
          </Button>
        </div>
      </div>

      <div>
        <h3 className='mb-2 font-semibold'>Text Variant</h3>
        <div className='flex gap-4'>
          <Button variant='text' color='black'>
            Black
          </Button>
          <Button variant='text' color='white'>
            White
          </Button>
          <Button variant='text' color='primary'>
            Primary
          </Button>
          <Button variant='text' color='secondary'>
            Secondary
          </Button>
        </div>
      </div>

      <div>
        <h3 className='mb-2 font-semibold'>Ghost Variant</h3>
        <div className='flex gap-4'>
          <Button variant='ghost' color='black'>
            Black
          </Button>
          <Button variant='ghost' color='white'>
            White
          </Button>
          <Button variant='ghost' color='primary'>
            Primary
          </Button>
          <Button variant='ghost' color='secondary'>
            Secondary
          </Button>
        </div>
      </div>

      <div>
        <h3 className='mb-2 font-semibold'>크기 옵션</h3>
        <div className='flex items-center gap-4'>
          <Button variant='solid' color='primary' size='sm'>
            Small
          </Button>
          <Button variant='solid' color='primary' size='md'>
            Medium
          </Button>
          <Button variant='solid' color='primary' size='lg'>
            Large
          </Button>
        </div>
      </div>

      <div>
        <h3 className='mb-2 font-semibold'>상태 및 너비 옵션</h3>
        <div className='flex max-w-md flex-col gap-2'>
          <Button variant='solid' color='primary' disabled>
            비활성화
          </Button>
          <Button variant='solid' color='primary' fullWidth>
            전체 너비
          </Button>
          <Button variant='solid' color='primary' width={200}>
            너비 200px
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
