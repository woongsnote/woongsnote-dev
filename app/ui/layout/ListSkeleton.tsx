const SkeletonItem = () => (
  <div className="mx-auto my-4 w-full max-w-md rounded-md border border-blue-300 p-4 shadow">
    <div className="flex animate-pulse flex-col space-x-4">
      <div className="hidden rounded-sm bg-slate-200 lg:block lg:h-48 lg:w-full"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-slate-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-200"></div>
            <div className="col-span-1 h-2 rounded bg-slate-200"></div>
          </div>
          <div className="h-2 rounded bg-slate-200"></div>
        </div>
      </div>
    </div>
  </div>
);

type ListSkeletonProps = {
  listLength: number;
};

export const ListSkeleton = ({ listLength }: ListSkeletonProps) => {
  const skeltonItems = Array.from({ length: listLength }, (_, index) => (
    <SkeletonItem key={index} />
  ));

  return <section className="grid grid-cols-1">{skeltonItems}</section>;
};
