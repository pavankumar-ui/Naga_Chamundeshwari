import { templeInfo } from "@/lib/data";

const TempleTimings = () => {
  return (
    <section className="bg-maroon text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-cinzel font-semibold">Temple Timings</h2>
            <p>Open Daily: {templeInfo.timings.daily}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <h3 className="font-medium">Morning Aarti</h3>
              <p>{templeInfo.timings.morningAarti}</p>
            </div>
            <div>
              <h3 className="font-medium">Special Pooja</h3>
              <p>{templeInfo.timings.specialPooja}</p>
            </div>
            <div>
              <h3 className="font-medium">Evening Aarti</h3>
              <p>{templeInfo.timings.eveningAarti}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleTimings;
