package com.eventmanagement.portal.config;

import com.eventmanagement.portal.model.Role;
import com.eventmanagement.portal.model.User;
import com.eventmanagement.portal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed default Super Admin if not already present
        if (userRepository.findByEmail("admin@eventara.com") == null) {
            User admin = new User();
            admin.setName("Super Admin");
            admin.setEmail("admin@eventara.com");
            admin.setPassword("admin123"); // Note: in production, encode this with BCrypt
            admin.setRole(Role.SUPER_ADMIN);
            admin.setApproved(true);
            userRepository.save(admin);
        }

        // Seed default Organizer if not already present
        if (userRepository.findByEmail("org@eventara.com") == null) {
            User organizer = new User();
            organizer.setName("Dinuja Ransara");
            organizer.setEmail("org@eventara.com");
            organizer.setPassword("org123");
            organizer.setRole(Role.ORGANIZER);
            organizer.setOrganizationName("NFORCE Club");
            organizer.setPhone("+94770000000");
            organizer.setApproved(true); // Pre-approved for testing
            userRepository.save(organizer);
        }

        // Seed default Normal User if not already present
        if (userRepository.findByEmail("user@eventara.com") == null) {
            User user = new User();
            user.setName("Dinuja.R");
            user.setEmail("user@eventara.com");
            user.setPassword("user123");
            user.setRole(Role.USER);
            user.setApproved(true);
            userRepository.save(user);
        }

        System.out.println("Sample users seeded into H2 database successfully.");
    }
}