package pi.raspberry.services;

import com.pi4j.context.Context;
import com.pi4j.io.gpio.digital.DigitalOutput;
import com.pi4j.io.gpio.digital.DigitalOutputConfig;
import com.pi4j.io.gpio.digital.DigitalOutputConfigBuilder;
import com.pi4j.io.gpio.digital.DigitalState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GpioService {

    private DigitalOutput output23;
    private DigitalOutput output24;

    @Autowired
    public GpioService(Context pi4j) {
        output23 = null;
        output24 = null;

        try {
            // Configure pin 23 (Ceiling Light 1)
            DigitalOutputConfig config23 = DigitalOutput.newConfigBuilder(pi4j)
                    .id("cl1")
                    .name("Ceiling Light 1")
                    .address(23)
                    .shutdown(DigitalState.HIGH)
                    .initial(DigitalState.HIGH)
                    .build();
            output23 = pi4j.create(config23);

            // Configure pin 24 (Ceiling Light 2)
            DigitalOutputConfig config24 = DigitalOutput.newConfigBuilder(pi4j)
                    .id("cl2")
                    .name("Ceiling Light 2")
                    .address(24)
                    .shutdown(DigitalState.HIGH)
                    .initial(DigitalState.HIGH)
                    .build();
            output24 = pi4j.create(config24);
        } catch (Exception e) {
            e.printStackTrace();
            output23 = null;
            output24 = null;
        }
    }

    public void toggleLed(int pin) {
        if (pin == 23 && output23 != null) {
            output23.toggle();
        } else if (pin == 24 && output24 != null) {
            output24.toggle();
        } else {
            throw new IllegalArgumentException("Unsupported pin number: " + pin);
        }
    }

    public DigitalState getLedState(int pin) {
        if (pin == 23 && output23 != null) {
            return output23.state();
        } else if (pin == 24 && output24 != null) {
            return output24.state();
        } else {
            throw new IllegalArgumentException("Unsupported pin number: " + pin);
        }
    }
}
