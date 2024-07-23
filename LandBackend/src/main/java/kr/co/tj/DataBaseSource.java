package kr.co.tj;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

@Component
public class DataBaseSource implements CommandLineRunner {

    private final ResourceLoader resourceLoader;

    public DataBaseSource(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(String... args) {
        try {
            // "file:" prefix is used for absolute paths
            Resource resource = resourceLoader.getResource("file:C:/app/config/dbSource.txt");
            
            // Use resource.getFile() to get the File object
            Path path = resource.getFile().toPath();
            Properties properties = new Properties();
            properties.load(Files.newBufferedReader(path));

            properties.forEach((key, value) -> {
                System.setProperty(key.toString(), value.toString());
                System.out.println("Set property: " + key + "=" + value);
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
