const App = () => {
    return (
      <div>
        <Tweet
          name="Taimoor Arshad"
          username="taitai43"
          date={new Date().toDateString()}
          message="Testing123"
        />
        <Tweet
          name="John Doe"
          username="jd123"
          date={new Date().toDateString()}
          message="I'm John"
        />
        <Tweet
          name="Jane Doe"
          username="jd456"
          date={new Date().toDateString()}
          message="I'm Jane"
        />
      </div>
    );
  }
  