import Timeline from "~/components/uiplus/timeline";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-4xl sm:text-4xl font-bold text-foreground mb-4 text-pretty">Our Journey</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the key milestones and achievements that shaped our story
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Years Active", value: "5+" },
            { label: "Team Members", value: "150+" },
            { label: "Happy Customers", value: "100K+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

      <Timeline />
    </main>
  )
}
