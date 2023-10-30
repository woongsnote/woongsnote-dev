const SkeletonItem = () => (
  <div className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto my-4 max-w-md">
    <div className="animate-pulse flex flex-col space-x-4">
      <div className="hidden lg:block rounded-sm bg-slate-200 lg:h-48 lg:w-full"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-200 rounded"></div>
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
