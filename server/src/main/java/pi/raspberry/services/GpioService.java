package pi.raspberry.services;

import com.pi4j.context.Context;
import com.pi4j.io.gpio.digital.DigitalOutput;
import com.pi4j.io.gpio.digital.DigitalOutputConfigBuilder;
import com.pi4j.io.gpio.digital.DigitalState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GpioService {

  private final DigitalOutput output;

  @Autowired
  public GpioService(Context pi4j) {
    DigitalOutputConfigBuilder config = DigitalOutput.newConfigBuilder(pi4j)
        .id("cl")
        .name("Ceiling Lights")
        .address(23)
        .shutdown(DigitalState.LOW)
        .initial(DigitalState.LOW);

    output = pi4j.create(config);
  }

  public void toggleLed() {
    output.toggle();
  }

  public DigitalState getLedState() {
    return output.state();
  }
}
