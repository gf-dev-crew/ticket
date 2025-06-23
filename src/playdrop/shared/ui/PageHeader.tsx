interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className='mb-4xl w-full'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      {subtitle && <p className='mt-md text-lg font-medium text-gray-200'>{subtitle}</p>}
    </section>
  );
}
